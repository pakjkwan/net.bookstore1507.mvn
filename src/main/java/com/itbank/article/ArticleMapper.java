package com.itbank.article;

import java.util.List;

import com.itbank.command.Command;

public interface ArticleMapper {
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/		
    public int insert(ArticleDTO article);
    public int update(ArticleDTO article);
    public int delete(ArticleDTO article);
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/ 
    public ArticleDTO detail(Command command);
    public List<ArticleDTO> search(Command command);
    public List<ArticleDTO> list(Command command);
    public int count(Command command);
    public int size(Command command);
}
