package com.itbank.item;

import org.springframework.stereotype.Component;

@Component
public class ItemDTO {
	private int itemSeq;
	private String userid;
	private String fileName; // 파일명
	private String realPath; // 파일 경로
	private int fileSize; // 파일 사이즈
	private int downloadCnt; // 다운로드 횟수
	private String description; // 상세설명
	public int getItemSeq() {
		return itemSeq;
	}
	public void setItemSeq(int itemSeq) {
		this.itemSeq = itemSeq;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getRealPath() {
		return realPath;
	}
	public void setRealPath(String realPath) {
		this.realPath = realPath;
	}
	public int getFileSize() {
		return fileSize;
	}
	public void setFileSize(int fileSize) {
		this.fileSize = fileSize;
	}
	public int getDownloadCnt() {
		return downloadCnt;
	}
	public void setDownloadCnt(int downloadCnt) {
		this.downloadCnt = downloadCnt;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
