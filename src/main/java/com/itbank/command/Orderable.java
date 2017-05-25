package com.itbank.command;

public interface Orderable {
	
	//*************************************
	//1. 상세 
	// *************************************/
	public void execute(String param1,String param2);
	public void execute(String param1,String param2,int param3);


	//*************************************
	// 2. 조회
	// *************************************/
	
	public void execute(int param1,String param2,String param3);
	public void execute(int param1,String param2,String param3,int param4);
	
	//*************************************
	// 3.목록 
	//*************************************/
	public void execute(int param1);
	public void execute(int param1,int param2);
	
	//*************************************
	//4.size
	// *************************************/
	public void execute();
	public void execute(int param1,String param2);
	/*중복 public void execute(int param1);*/
	
	//*************************************
	// 5.카운팅 
	//  *************************************/
	public void execute(String param1,int param2);
	/*중복 public void execute(String param1,String param2,int param3);*/
	
}	
