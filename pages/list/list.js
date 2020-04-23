const fetch = require('../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: {},//当前加载的分类
    //此分类下所有的店铺
    shops: [],
    pageIndex:0,
    pageSize:20,
    hasMore:true
  },
  loadMOre() {
    if(this.data.hasMore) return
    let {pageIndex,pageSize}=this.data
    const params={ _page: ++pageIndex, _limit: pageSize }
    fetch(`categories/${this.data.category.id}/shops`, ).then(res => {
      const totalCount=parseInt(res.header['X-Total-Count'])
      const hasMore=this.pageIndex *pageSize<totalCount
      const shops=this.data.shops.concat(res.data);
      this.setData({ shops,pageIndex,hasMore })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   return fetch(`categories/${options.cat}`).then(res => {
      //这里不能确定是在onReady过后执行的
      // wx.setNavigationBarTitle({
      //   title:res.data.name
      // })
      this.setData({ category: res.data })
      wx.setNavigationBarTitle({
        title: res.data.name
      })
      //加载完费雷信息过后再去加载商铺信息
      return this.loadMOre();
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.category.name) {
      wx.setNavigationBarTitle({
        title: this.data.category.name
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({shops:[],pageIndex:0,hasMore:true})
    this.loadMOre();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMOre().then(()=>wx.stopPullDownRefresh());
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})