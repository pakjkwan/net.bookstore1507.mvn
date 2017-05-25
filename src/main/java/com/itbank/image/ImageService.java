package com.itbank.image;

import java.util.List;

import com.itbank.command.Command;

public interface ImageService {
/*===== executeUpdate =====*/	
	
	/*추가 */
    public int insert(ImageDTO image);
    /*수정 */
    public int update(ImageDTO image);
    /*삭제 */
    public int delete(ImageDTO image);
    
/*===== executeQuery =====*/    
    
    /*상세*/
    public ImageDTO detail(Command command);
    /*검색 */
    public List<ImageDTO> search(Command command);
    /* 전체 조회 */
    public List<ImageDTO> list(Command command);
    /* 특정 조회수*/
    public int count(Command command);
    /* 전체 조회수*/
    public int size(Command command);
  
}
