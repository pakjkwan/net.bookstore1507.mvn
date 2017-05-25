package com.itbank.command;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CountCommand extends Command{
	private static final Logger logger = LoggerFactory.getLogger(SizeCommand.class);
	@Override
	public void execute(String searchKey, String searchVal) {
		setSearchKey(searchKey);
		setSearchVal(searchVal);
		logger.info(" 검색 커맨드 검색키={}, 검색값={}",getSearchKey(),getSearchVal());
	}
	@Override
	public void execute(String searchKey, String searchVal,int theme) {
		setSearchKey(searchKey);
		setSearchVal(searchVal);
		setTheme(theme);
		logger.info(" 검색 커맨드 검색키={}, 검색값={}",getSearchKey(),getSearchVal());
	}
}
