package com.itbank.book;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itbank.article.ArticleController;

@Controller
@RequestMapping("/book")
public class BookController {
	private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
	@RequestMapping(value="/{path}") 
	public String path(@PathVariable("path")String path ) {
		return "book/"+path+".jsp"; 
	}
}
