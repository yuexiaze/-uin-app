import {baseUrl} from './config.js';

export function topList(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/toplist/detail`,
			method:'GET',
			data:{},
			success:res=>{
				let result=res.data.list;
				result.length=4;
				reslove(result)
			},
			fail:()=>{},
			complete:()=>{}
		})
	})	
}

export function list(Id){
	return uni.request({
		url:`${baseUrl}/playlist/detail?id=${Id}`
	})
}

export function songDetail(songId){
	return uni.request({
		url:`${baseUrl}/song/detail?ids=${songId}`
	})
}
export function songSimi(songId){
	return uni.request({
		url:`${baseUrl}/simi/song?id=${songId}`
	})
}

export function songComment(songId){
	return uni.request({
		url:`${baseUrl}/comment/music?id=${songId}`,
		limit:1
	})
}

export function songLyric(songId){
	return uni.request({
		url:`${baseUrl}/lyric?id=${songId}`
		
	})
}

export function songUrl(songId){
	return uni.request({
		url:`${baseUrl}/song/url?id=${songId}`
	})
}

export function searchHot(){
	return uni.request({
		url:`${baseUrl}/search/hot/detail`
	})
}

export function searchWord(word){
	return uni.request({
		url:`${baseUrl}/search?keywords=${word}`
	})
}

export function searchSuggest(word){
	return uni.request({
		url:`${baseUrl}/search/suggest?keywords=${word}&type=mobile`
	})
}