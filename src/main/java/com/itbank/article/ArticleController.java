package com.itbank.article;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.itbank.command.CommandFactory;
import com.itbank.member.MemberDTO;

@Controller
@SessionAttributes("user")
@RequestMapping("/article")
public class ArticleController {
	private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);
	@Autowired ArticleDTO article;
	@Autowired ArticleService service;
	//***********************************************/
	/*no execute*/
	//***********************************************/
	@RequestMapping("/path/{theme}/{action}")
	public String path(@PathVariable("theme")String theme,
			@PathVariable("action")String action,
			@ModelAttribute("user") MemberDTO user, Model model){
		logger.info("[ 컨트롤러 ] 경로 액션 = {}", action);
		model.addAttribute("member", user);
		model.addAttribute("action", action);
		return "auth/article/"+theme+".tiles";
	}

	//***********************************************/	
	//*executeUpdate*/	
	//***********************************************/
	@RequestMapping(value="/write",
			method=RequestMethod.POST, 
			produces="application/json")
	public @ResponseBody List<ArticleDTO> write(
			Map<String,Object>params
			){
		List<ArticleDTO> list = new ArrayList<ArticleDTO>();
		System.out.println("아이디 : "+params.toString());
		/*System.out.println("테마 : "+article.getThmSeq());
		System.out.println("타이틀 : "+article.getTitle());
		System.out.println("컨텐츠 : "+article.getContent());*/
	
		int ok = service.insert(article);
		if (ok==1) {
			list = service.search(CommandFactory.search(1,"userid",article.getUserid(),1000));
			
		} else {
			list = null;
		}
		return list;
	}
	
	@RequestMapping(value="/update",method=RequestMethod.GET)
	public @ResponseBody ArticleDTO update(
			@ModelAttribute ArticleDTO article){
		logger.info("[수정]아이디={}",article.getUserid());
		logger.info("[수정]글 일련번호={}",article.getArtSeq());
		int ok = service.update(article);
		if (ok==1) {
			article = service.detail(CommandFactory.detail("userid", article.getUserid(), article.getArtSeq()));
			
		} else {
			article = null;
		}
		return article;
	}
	@RequestMapping("/remove")
	public String  delete(
			@ModelAttribute ArticleDTO article){
		logger.info("[삭제]아이디={}",article.getUserid());
		logger.info("[삭제]글 일련번호={}",article.getArtSeq());
		int ok = service.delete(article);
		logger.info("[삭제]글 성공 여부 체크 1이면 삭제완료={}",ok);
		return "redirect:/article/search/1000/"+article.getUserid()+"/1";
		/*1000 : 테마시퀀스, 1 : 페이징*/
	}
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/	
	@RequestMapping("/detail/{userid}/{artSeq}")
	public @ResponseBody ArticleDTO detail(
			@PathVariable("userid")String userid,
			@PathVariable("artSeq")String artSeq){
		logger.info("[상세]아이디={}",userid);
		logger.info("[상세]글 일련번호={}",artSeq);
		return service.detail(CommandFactory.detail("userid", userid, Integer.parseInt(artSeq)));
	}
	@RequestMapping("/search/{theme}/{userid}/{pageNo}")
	public @ResponseBody  Map<String,Object> search(
			@ModelAttribute("user")MemberDTO user,
			@PathVariable("pageNo")String paramPage,
			@PathVariable("theme")String strTheme,
			@PathVariable("userid")String userid){
		Map<String,Object> map = new HashMap<String,Object>();
		List<ArticleDTO> list = new ArrayList<ArticleDTO>();
		int pageNo = Integer.parseInt(paramPage);
		int theme = Integer.parseInt(strTheme);
		list = service.search(CommandFactory.search(pageNo,"userid",userid,theme)); 
		System.out.println("리스트결과" + list.toString());
		int size = service.size(CommandFactory.size(theme, user.getUserid()));
		logger.info("사이즈결과 ={}",size);
		map.put("currentPage", pageNo);
		map.put("size", size);
		map.put("list", list);
		return map;
	}
	/*@RequestMapping("/list/{theme}/{pageNo}")
	public @ResponseBody List<ArticleDto> list (
			@PathVariable("pageNo")String paramPage,
			@PathVariable("theme")String strTheme){
		List<ArticleDto> list = new ArrayList<ArticleDto>();
		if (paramPage == null) {
			paramPage = "1";
		}
		int pageNo = Integer.parseInt(paramPage);
		int theme = Integer.parseInt(strTheme);
		list = service.list(CommandFactory.list(pageNo,theme));
		System.out.println("리스트결과" + list.toString());
		return list;
	}*/
	@RequestMapping("/list/{theme}/{pageNo}")
	public @ResponseBody Map<String,Object> list (
			@PathVariable("pageNo")String paramPage,
			@PathVariable("theme")String strTheme){
		Map<String,Object> map = new HashMap<String,Object>();
		List<ArticleDTO> list = new ArrayList<ArticleDTO>();
		if (paramPage == null) {
			paramPage = "1";
		}
		int pageNo = Integer.parseInt(paramPage);
		int theme = Integer.parseInt(strTheme);
		list = service.list(CommandFactory.list(pageNo,theme));
		logger.info("리스트결과 ={}" + list.toString());
		int size = service.size(CommandFactory.size(theme));
		logger.info("사이즈결과 ={}",size);
		map.put("size", size);
		map.put("list", list);
		return map;
	}
	
}














