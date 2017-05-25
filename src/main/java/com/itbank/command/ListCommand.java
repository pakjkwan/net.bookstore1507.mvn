package com.itbank.command;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ListCommand extends Command{
	private static final Logger logger = LoggerFactory.getLogger(ListCommand.class);
	@Override
	public void execute(int pageNo) {
		System.out.println("리스트 커맨드 :"+pageNo);
		setPageNo(pageNo);
		logger.info("리스트 커맨드 페이지 시작번호={}",start);
	}
	@Override
	public void execute(int pageNo,int theme) {
		System.out.println("리스트 커맨드 :"+pageNo);
		setPageNo(pageNo);
		setTheme(theme);
		logger.info("리스트 커맨드 페이지 시작번호={}",start);
	}
	
}
