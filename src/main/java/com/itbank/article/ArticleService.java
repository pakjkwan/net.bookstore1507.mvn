package com.itbank.article;

import java.util.List;

import com.itbank.command.Command;

public interface ArticleService {
/*===== executeUpdate =====*/	
	
	/*추가*/
    public int insert(ArticleDTO article);
    /*수정*/
    public int update(ArticleDTO article);
    /*삭제*/
    public int delete(ArticleDTO article);
    
/*===== executeQuery =====*/    
    
    /*상세*/
    public ArticleDTO detail(Command command);
    /*검색*/
    public List<ArticleDTO> search(Command command);
    /*목록*/
    public List<ArticleDTO> list(Command command);
    /*검색수*/
    public int count(Command command);
    /*전체수*/
    public int size(Command command);
    
}
