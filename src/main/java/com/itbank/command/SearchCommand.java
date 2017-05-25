package com.itbank.command;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class SearchCommand extends Command{
	private static final Logger logger = LoggerFactory.getLogger(SearchCommand.class);
	@Override
	public void execute(int pageNo, String searchKey, String searchVal) {
		setPageNo(pageNo);
		setSearchKey(searchKey);
		setSearchVal(searchVal);
		logger.info("검색 커맨드 검색키={}, 검색값={}",getSearchKey(), getSearchVal());
	}
	@Override
	public void execute(int pageNo, String searchKey, String searchVal,int theme) {
		setPageNo(pageNo);
		setSearchKey(searchKey);
		setSearchVal(searchVal);
		setTheme(theme);
		logger.info("검색 커맨드 검색키={}, 검색값={}",getSearchKey(), getSearchVal());
	}
}
