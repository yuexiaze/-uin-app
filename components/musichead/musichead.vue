<template>
	<view class="music-head" :style="{ color : color }">
		<view v-if="icon" class="music-head-icon" :class="{ 'music-head-iconBlack' : iconBlack }">
			<text @tap="handleToBack" class="iconfont iconzuojiantou-copy"></text> | <text @tap="handleToHome" class="iconfont iconshouye"></text>
		</view>
		{{ title }}
	</view>
</template>

<script>
	import '../../common/iconfont.css'
	export default {
		data() {
			return {
				
			};
		},
		props : ['title','icon','color','iconBlack'],
		methods : {
			handleToBack(){
				uni.navigateBack();
			},
			handleToHome(){
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
.music-head{ height:75px; text-align: center; line-height: 80px; font-size:16px; color:black; overflow: hidden; position: relative;}
.music-head-icon{ width:97px; height:31px; background:rgba(0,0,0,0.4); border-radius: 15px; position: absolute; left:10px; top:25px; line-height: 31px; display: flex; justify-content: space-evenly; color:white;}
.music-head-iconBlack{ color:black; background:white; border:1px rgba(0,0,0,0.1) solid;}
</style>
	