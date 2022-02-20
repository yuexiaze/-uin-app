<template>
	<view class="list">
		<view class="fixbg" :style="{'background-image':'url('+playlist.coverImgUrl+')'}"></view>
		<musichead title="歌单" :icon="true" color="white"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true" >
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl"></image>
						<text class="iconfont iconyousanjiao">{{playlist.playCount | formatCount}}</text>
					</view>
					<view class="list-head-text">
						<view>{{playlist.name}}</view>
						<view>
							<image :src="playlist.creator.avatarUrl" mode=""></image>{{playlist.creator.nickname}}
						</view>
						<view class="description">
							{{playlist.description}}
						</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button class="list-share" open-type="share">
					<text class="iconfont iconicon-"></text>分享给微信好友
				</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont iconbofang1"></text>	
						<text>播放全部</text>
						<text>(共{{playlist.trackCount}}首)</text>
					</view>
					<!-- <view class="list-music-item">
						<view class="list-music-top">1</view>
					    <view class="list-music-song">
							<view>与我无关</view>
							<view>
								<image src="../../static/dujia.png" mode=""></image>
								<image src="../../static/sq.png" mode=""></image>
								啊冗-与我无关
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view> -->
					<view @tap="handleToDetail(item.id)" class="list-music-item" v-for="(item,index) in playlist.tracks" :key="index">
						<view class="list-music-top">{{index+1}}</view>
					    <view class="list-music-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="privileges[index].flag>60 && privileges[index].flag<70" src="../../static/dujia.png" mode=""></image>
								<image v-if="privileges[index].maxbr==999000" src="../../static/sq.png" mode=""></image>
								{{item.ar[0].name}}-{{item.name}}
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view> 
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {list} from'../../common/api.js'
	export default {
		data() {
			return {
				playlist:{
					coverImgUrl:'',
					creator:{avatarUrl:''},
					trackCount:0
				},
				privileges:[],
				// color:{
				// 	bs:'#E781AE',
				// 	yc:'#73BFE8',
				// 	xg:'#74CEC2',
				// 	rg:'#E26C60'
				// },
				isLoading:true,
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:'加载中...'
			})
			list(options.id).then(res=>{
				if(res[1].data.code=='200'){
					this.playlist=res[1].data.playlist
					this.privileges=res[1].data.privileges
					this.$store.commit('INIT_TOPLISTIDS',res[1].data.playlist.trackIds)
					this.isLoading=false
					uni.hideLoading()
				}
			})
		},
		methods: {
			handleToDetail(id){
				uni.navigateTo({
					url:'../detail/detail?id=' + id
				});
			}
		},
		computed:{
			// isColor(){
			// 	if(this.playlist.name=='飙升榜'){		
			// 		return this.color.bs 
			// 	}else if(this.playlist.name=='热歌榜'){
			// 		return this.color.rg 
			// 	}else if(this.playlist.name=='新歌榜'){
			// 		return this.color.xg 
			// 	}else{
			// 		return this.color.yc 
			// 	}
			// }
		}
	}
</script>

<style scoped>
  .list-head{ display: flex;margin:30rpx;}
  .list-head-img{width: 264rpx; height: 264rpx; border-radius: 30rpx;overflow: hidden;position: relative; margin-right: 42rpx;}
  .list-head-img image{width: 100%;height: 100%;}
  .list-head-img text{position: absolute;right: 8rpx;top:9rpx;color: #fff;font-size: 26rpx;}
  .list-head-text{flex: 1; color: #f0f2f7;}
  .list-head-text view:nth-child(1){color: #fff;font-size: 34rpx;}
  .list-head-text view:nth-child(2){display: flex; margin: 20rpx 0;font-size: 24rpx;align-items: center;}
  .list-head-text view:nth-child(2) image{width: 54rpx;height: 54rpx;border-radius: 50%;margin-right: 14rpx;}
  .list-head-text view:nth-child(3){line-height: 34rpx;font-size: 22rpx;}
  
  .list-share{width: 330rpx;height: 74rpx; margin: 0 auto;background: rgba(0,0,0,0.4); border-radius: 37rpx;color: #fff;text-align: center;line-height: 74rpx;font-size: 28rpx;}
  .list-share text{margin-right: 16rpx;}
  
  .list-music{background: #fff;border-radius: 50rpx; margin-top: 40rpx;overflow: hidden;}
  .list-music-head{height: 50rpx;margin: 30rpx 0 70rpx 22rpx;}
  .list-music-head text:nth-child(1){height: 50rpx;font-size: 50rpx;}
  .list-music-head text:nth-child(2){font-size: 30rpx;margin: 0 10rpx 0 26rpx;}
  .list-music-head text:nth-child(3){font-size: 26rpx; color: #b2b2b2;}
  .list-music-item{color:#959595;display:flex; margin: 0 32rpx 66rpx 46rpx;align-items: center;}
  .list-music-top{width: 58rpx;font-size: 30rpx;line-height: 30rpx;}
  .list-music-song{flex: 1;}
  .list-music-song view:nth-child(1){font-size: 28rpx; color:#000;width: 70vw;white-space: nowrap;overflow:hidden; text-overflow: ellipsis;}
  .list-music-song view:nth-child(2){font-size: 20rpx;align-items: center;width: 70vw;white-space: nowrap;overflow:hidden; text-overflow: ellipsis;}
  .list-music-song view:nth-child(2) image{width: 32rpx;height: 20rpx;margin-right: 10rpx;}
  .list-music-item text{font-size: 50rpx; color: #c7c7c7;}
  
  .description{
	  display: -webkit-box;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    word-wrap: break-word;
	    white-space: normal !important;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
  }
</style>
