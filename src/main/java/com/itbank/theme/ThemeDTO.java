package com.itbank.theme;

import org.springframework.stereotype.Component;

@Component
public class ThemeDTO {
	private int thmSeq;
	private String boardName;
	public int getThmSeq() {
		return thmSeq;
	}
	public void setThmSeq(int thmSeq) {
		this.thmSeq = thmSeq;
	}
	public String getBoardName() {
		return boardName;
	}
	public void setBoardName(String boardName) {
		this.boardName = boardName;
	}
	
	
}
