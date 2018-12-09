const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('zh-cn');
// title: String == title: { type: String }
// 文章表共6个字段
const articleSchema = new Schema({
  title: String,
  author: String,
  desc:String,
  keyword:String,
  content: String,
  img_url:String,
  origin:String,
  type:String,
  postTags:String,
  publish: {
    type: Boolean,
    default: false
  },
  createTime: Date,
  lastEditTime: {
    type: Date,
    default: Date.now
  },
  tags: String  //type为tag文档的id
});
//必须先set后get
articleSchema.set('toJSON', {getters: true, virtuals: true});
articleSchema.set('toObject', {getters: true, virtuals: true});
articleSchema.path('createTime').get(function(v) {
  return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});
articleSchema.path('lastEditTime').get(function(v) {
  return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});
//module.exports 指向新的对象时，exports 断开了与 module.exports 的引用
//，那么通过 exports = module.exports 让 exports 重新指向 module.exports 即可。
exports = module.exports = mongoose.model('article', articleSchema);