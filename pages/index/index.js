//index.js
//获取应用实例
const app = getApp()
var jsonData = require('../../common/js/json.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    dataList:[],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    popupTrue:false,
    state:'',
    cityCode:'',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickCity:function(){
    var that=this;
    that.setData({
        popupTrue: true
      })
  },
  select_date: function (e) {
         this.setData({
             state: e.currentTarget.dataset.key,
             popupTrue: false,
             cityCode: e.target.dataset.text,
             
           });
    console.log(this.data.cityCode);
    wx.setStorageSync('cityCode', this.data.cityCode);
  },
  openHistorySearch: function () {
    this.setData({
      cityCode: wx.getStorageSync('cityCode') || [],//若无储存则为空
    })
  },
  onLoad: function () {
    this.openHistorySearch();
    if (this.data.cityCode===''){
      this.setData({
        popupTrue: true
      });
    }
    this.setData({
      //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList
      dataList: jsonData.dataList.listContent,
      citysList: jsonData.dataList.citys
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    
   
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
