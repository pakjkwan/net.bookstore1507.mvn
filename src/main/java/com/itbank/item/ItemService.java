package com.itbank.item;

import java.util.List;

import com.itbank.article.ArticleDTO;
import com.itbank.command.Command;

public interface ItemService {
/*===== executeUpdate =====*/	
	
	/*추가*/
    public int insert(ItemDTO item);
    /*수정*/
    public int update(ItemDTO item);
    /*삭제*/
    public int delete(ItemDTO item);
    
/*===== executeQuery =====*/    
    
    /*상세*/
    public ItemDTO detail(Command command);
    /*검색*/
    public List<ItemDTO> search(Command command);
    /*목록*/
    public List<ItemDTO> list(Command command);
    /*검색수*/
    public int count(Command command);
    /*전체수*/
    public int size(Command command);
}
