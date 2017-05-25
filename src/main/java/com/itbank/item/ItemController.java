package com.itbank.item;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.itbank.command.CommandFactory;
@Controller
public class ItemController {
	@Autowired ItemService service;
	@Autowired ItemDTO item;
	
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
	@RequestMapping(value="/itemInsert.do")
	public String insert(
			@ModelAttribute ItemDTO item
			){
		service.insert(item);
		String url="itemList.do";
		return "redirect:" + url;
	}
	
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/

	
	@RequestMapping("/myseat.do")
	public ModelAndView myseat(ModelAndView mav){
		mav.setViewName("views/movie/myseat");
		return mav;
	}
	
	@RequestMapping("/itemDetail.do")
	public ModelAndView detail(
			ModelAndView mav,
			@RequestParam("item_no")int itemNo){
		
		String searchKey = "";
		String searchVal = "";
		
		mav.addObject("itemDetail", service.detail(CommandFactory.detail(searchKey, searchVal)));
		mav.setViewName("views/item/main");
		return mav;
	}

	@RequestMapping("/itemSearch.do")
	public ModelAndView search(ModelAndView mav,
			@RequestParam("keyword") String keyword){
		int pageNo = 0;
		String searchKey = "";
		String searchVal = "";
		mav.addObject("itemDetail", service.search(CommandFactory.search(pageNo, searchKey, searchVal)));
		mav.setViewName("views/item/main");
		return mav;
	}
	@RequestMapping("/itemList.do")
	public @ResponseBody List<ItemDTO> list(Model  model){     
		
		return service.list(CommandFactory.list(1));
	 }//end
	


	/*@RequestMapping("/itemImgList.do")
	public ModelAndView item_img_list(ModelAndView mav){
		System.out.println("ItemController item_img_list:" + "진입" );
		List<ItemDto> itemImgList = service.itemImgList();
		Iterator<ItemDto> it = itemImgList.iterator();
		while(it.hasNext()){
			String el = it.next().toString();
			System.out.println("ItemCont 아이템 이미지 :" + el);
		}
		System.out.println("ItemController item_img_list:" + "담기 직전" );
		mav.addObject("itemImgList", itemImgList);
		
		return mav;
	}*/
	//***********************************************/
	/*no execute*/
	//***********************************************/
	@RequestMapping("/itemMain.do")
	public ModelAndView main(ModelAndView mav){
		mav.setViewName("views/item/main");
		return mav;
	}
}
