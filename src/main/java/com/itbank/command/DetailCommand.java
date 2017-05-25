package com.itbank.command;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DetailCommand extends Command{
	private static final Logger logger = LoggerFactory.getLogger(DetailCommand.class);
	@Override
	public void execute(String searchKey, String searchVal) {
		setSearchKey(searchKey);
		setSearchVal(searchVal);
		logger.info("상세커맨드 검색키={}, 검색값={}",getSearchKey(), getSearchVal());
	}
	@Override
	public void execute(String seqKey, int seqVal) {
		setSearchKey(searchKey);
		setSearchVal(searchVal);
		logger.info("상세커맨드 검색키={}, 검색값={}",getSearchKey(), getSeq());
	}
	@Override
	public void execute(String searchKey, String searchVal,int theme) {
		setSearchKey(searchKey);
		setSearchVal(searchVal);
		setTheme(theme);
		logger.info("상세커맨드 검색키={}, 검색값={}",getSearchKey(), getSearchVal());
	}
}
