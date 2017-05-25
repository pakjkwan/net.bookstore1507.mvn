package com.itbank.admin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.itbank.command.Command;
import com.itbank.command.CommandFactory;
import com.itbank.member.MemberServiceImpl;
import com.sun.xml.internal.ws.api.streaming.XMLStreamReaderFactory.Default;

@Controller
@RequestMapping("/admin")
public class AdminController {
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	@Autowired MemberServiceImpl memberService;
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
	@RequestMapping("/member.do")
	public ModelAndView main(@RequestParam("command") String command,
		@RequestParam(value="pageNo",defaultValue="1")String paramPage,
		@RequestParam(value="searchKey",required=false) String searchKey,
		@RequestParam(value="searchVal",required=false) String searchVal,
		ModelAndView mav){
		logger.info("[ 컨트롤 ] : command = {}, pageNo ={} ",command, paramPage);	
		logger.info("[ 컨트롤 ] : searchKey = {}, searchVal ={} ",searchKey, searchVal);
		int pageNo = Integer.parseInt(paramPage);
		switch (command) {
		case "list": 
			mav.addObject("memberList",memberService.list(CommandFactory.list(pageNo)));
			mav.addObject("count",memberService.size());
			mav.setViewName("admin/main.tiles"); break;
		case "search": 
			switch (searchKey) {
			case "list":
				mav.addObject("memberList",memberService.list(CommandFactory.list(pageNo)));
				mav.addObject("count",memberService.size());
				mav.setViewName("admin/main.tiles"); break;
			case "userid":
			
				mav.addObject("member",memberService.detail(CommandFactory.detail(searchKey, searchVal)));
				mav.setViewName("admin/detail.tiles"); break;
			case "name":
				mav.addObject("memberList", memberService.search(CommandFactory.search( pageNo,searchKey, searchVal)));
				mav.addObject("count", memberService.count(CommandFactory.count(searchKey, searchVal)));
				mav.setViewName("admin/main.tiles");break;
			default: System.out.println("디폴트로 넘어온 에러 발생 !!");
				 break;
			}
			
		default:CommandFactory.list(pageNo); break;
		}
		
		return mav;
	}
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/
}
