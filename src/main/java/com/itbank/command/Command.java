package com.itbank.command;

public class Command implements Orderable{
	public final int PAGESIZE = 10;
	int pageNo, start, end,theme,seq;
	String command, searchKey,searchVal;
	
	public void setCommand(String command) {
		this.command = command;
	}
	
	public void setPageNo(int pageNo) {
		this.start = (pageNo-1)*PAGESIZE+1;
		this.end = (pageNo)*PAGESIZE;
	}

	public int getPageNo() {
		return pageNo;
	}


	public int getStart() {
		return start;
	}

	public int getEnd() {
		return end;
	}
	
	

	public String getCommand() {
		return command;
	}

	public String getSearchKey() {
		return searchKey;
	}

	public String getSearchVal() {
		return searchVal;
	}


	public void setStart(int start) {
		this.start = start;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public void setSearchKey(String searchKey) {
		this.searchKey = searchKey;
	}

	public void setSearchVal(String searchVal) {
		this.searchVal = searchVal;
	}


	public int getTheme() {
		return theme;
	}

	public void setTheme(int theme) {
		this.theme = theme;
	}
	
	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	/*************************************
	1. 상세 
	 *************************************/
	@Override
	public void execute(String param1,String param2) {}
	@Override
	public void execute(String param1, String param2, int param3) {}
	/*************************************
	 2.조회
	 *************************************/
	@Override
	public void execute(int param1,String param2, String param3) {}
	@Override
	public void execute(int param1,String param2, String param3, int param4) {}
	/*************************************
	 3.목록 
	 *************************************/
	@Override
	public void execute(int param1) {}
	@Override
	public void execute(int param1,int param2) {}
	/*************************************
	4.크기 
	 *************************************/
	@Override
	public void execute() {}
	@Override
	public void execute(int param1, String param2) {}
	/*************************************
	5. 카운팅 
	 *************************************/
	@Override
	public void execute(String param1, int param2) {}

	
	
}
