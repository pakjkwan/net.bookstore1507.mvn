package com.itbank.file;

import org.springframework.web.multipart.MultipartFile;

public class FileDTO {
	MultipartFile file;
	private int fIdx;
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	public int getfIdx() {
		return fIdx;
	}
	public void setfIdx(int fIdx) {
		this.fIdx = fIdx;
	}
	
}
