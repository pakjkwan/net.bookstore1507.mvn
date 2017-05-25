package com.itbank.image;

import org.springframework.stereotype.Component;

@Component
public class ImageDTO {
	private int imgSeq;
	private String image;
	private String bigImage;
	private String userid;
	private int bookSeq;
	public int getImgSeq() {
		return imgSeq;
	}
	public String getImage() {
		return image;
	}
	public String getBigImage() {
		return bigImage;
	}
	public String getUserid() {
		return userid;
	}
	public int getBookSeq() {
		return bookSeq;
	}
	public void setImgSeq(int imgSeq) {
		this.imgSeq = imgSeq;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public void setBigImage(String bigImage) {
		this.bigImage = bigImage;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public void setBookSeq(int bookSeq) {
		this.bookSeq = bookSeq;
	}
	
	
	
}
