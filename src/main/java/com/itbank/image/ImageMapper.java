package com.itbank.image;

import java.util.List;

import com.itbank.command.Command;

public interface ImageMapper {
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
	public int insert(ImageDTO Image);
	public int update(ImageDTO Image);
	public int delete(ImageDTO Image);
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/
	public int size(Command command);
	public int count(Command command);
	public ImageDTO detail(Command command);
	public List<ImageDTO> search(Command command);
	public List<ImageDTO> list(Command command);
}
