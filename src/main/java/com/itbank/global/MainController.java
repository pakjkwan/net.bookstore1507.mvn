package com.itbank.global;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping(value = "/home")
public class MainController {
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
	@RequestMapping(value = "/main")
	public String home(Model model) {
		logger.info("[ 컨트롤 ] : home");
		return "public/home/content.tiles";
	}

	@RequestMapping(value="/create", method=RequestMethod.POST) 
	public String setLicense( ) {
		return "redirect:/springmvc/test?param=1"; 

	}

	@RequestMapping(value="/set", method=RequestMethod.GET) 
	public String set( RedirectAttributes redirectAttributes ) { 
		//addAttribute로 전달할 값을 저장한다. 
		redirectAttributes.addAttribute("notifications", "true"); 
		redirectAttributes.addAttribute("message", "success"); 
		//addFlashAttribute로 전달할 값을 저장한다. 
		redirectAttributes.addFlashAttribute("notifications", "true"); 
		redirectAttributes.addFlashAttribute("message", "success"); 
		return "redirect:list"; 
	} 
	@RequestMapping(value="/header") 
	public String header( ) {
		return "home/header.jsp"; 

	}
	@RequestMapping(value="/gnb") 
	public String gnb( ) {
		return "home/navi.jsp"; 

	}
	@RequestMapping(value="/bestseller") 
	public String bestseller( ) {
		return "book/bestseller.jsp"; 

	}
	@RequestMapping(value="/footer") 
	public String footer( ) {
		return "home/footer.jsp"; 

	}

}
