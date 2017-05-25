package com.itbank.command;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class CommandFactory {
	private static final Logger logger = LoggerFactory.getLogger(CommandFactory.class);
	private static Command instance;
	private CommandFactory() {}
	//****************************
	//  1. 상세(detail)
	//****************************
	public static Command detail(String searchKey,String searchVal){
		instance = new DetailCommand();
		instance.execute(searchKey, searchVal);
		logger.info("[팩토리] 검색키={} 검색값={}",instance.getSearchKey(),instance.getSearchVal());
		return instance;
	}
	public static Command detail(String searchKey,int seqVal){
		instance = new DetailCommand();
		instance.execute(searchKey, seqVal);
		logger.info("[팩토리] 시퀀스키={} 시퀀스값={}",instance.getSearchKey(),instance.getSeq());
		return instance;
	}
	public static Command detail(String searchKey,String searchVal,int theme){
		instance = new DetailCommand();
		instance.execute(searchKey, searchVal,theme);
		logger.info("[팩토리] 검색키={} 검색값={}",instance.getSearchKey(),instance.getSearchVal());
		return instance;
	}
	//****************************
	//  2. 조회(search)
	//****************************
	public static Command search(int pageNo,String searchKey, String searchVal){
		instance = new SearchCommand();
		instance.execute(pageNo, searchKey, searchVal);
		logger.info("[팩토리] 검색키={} 검색값={}",instance.getSearchKey(),instance.getSearchVal());
		return instance;
	}
	public static Command search(int pageNo,String searchKey, String searchVal,int theme){
		instance = new SearchCommand();
		instance.execute(pageNo,searchKey, searchVal,theme);
		logger.info("[팩토리] 검색키={} 검색값={}",instance.getSearchKey(),instance.getSearchVal());
		return instance;
	}
	//****************************
	//  3. 목록(list)
	// ****************************
	public static Command list(int pageNo){
		instance = new ListCommand();
		instance.execute(pageNo);
		logger.info("[팩토리] 시작={}, 끝={} ",instance.getStart(),instance.getEnd());
		return instance;
	}
	public static Command list(int pageNo,int theme){
		instance = new ListCommand();
		instance.execute(pageNo,theme);
		logger.info("[팩토리] 시작={}, 끝={} ",instance.getStart(),instance.getEnd());
		return instance;
	}
	//****************************
	//  4. 크기(size)
	 //****************************
	public static Command size(){
		instance = new SizeCommand();
		instance.execute();
		logger.info("[팩토리] 전체목록수 구하기 no param ");
		return instance;
	}
	public static Command size(int theme){
		instance = new SizeCommand();
		instance.execute(theme);
		logger.info("[팩토리] 전체목록수 구하기 theme param");
		return instance;
	}
	public static Command size(int theme, String userid){
		instance = new SizeCommand();
		instance.execute(theme, userid);
		logger.info("[팩토리] 전체목록수 구하기 theme+userid params");
		return instance;
	}
	//****************************
	//  5. 카운팅(count)
	//****************************
	public static Command count(String searchKey, String searchVal){
		instance = new CountCommand();
		instance.execute(searchKey, searchVal);
		logger.info("[팩토리] 검색키={} 검색값={}",instance.getSearchKey(),instance.getSearchVal());
		return instance;
	}
	public static Command count(String searchKey, String searchVal,int theme){
		instance = new CountCommand();
		instance.execute(searchKey, searchVal,theme);
		logger.info("[팩토리] 검색키={} 검색값={}",instance.getSearchKey(),instance.getSearchVal());
		return instance;
	}
}
