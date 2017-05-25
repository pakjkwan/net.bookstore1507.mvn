package com.itbank.command;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SizeCommand extends Command {
	private static final Logger logger = LoggerFactory.getLogger(SizeCommand.class);
	@Override
	public void execute() {
		logger.info("no param 사이즈");
	}
	@Override
	public void execute(int theme) {
		logger.info("theme param 사이즈");
	}
	@Override
	public void execute(int theme, String userid) {
		setTheme(theme);
		setSearchVal(userid);
		logger.info("theme+userid params 사이즈");
	}
}
