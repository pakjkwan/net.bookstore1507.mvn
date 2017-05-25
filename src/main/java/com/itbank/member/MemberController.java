package com.itbank.member;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.itbank.command.Command;
import com.itbank.command.CommandFactory;
import com.itbank.image.ImageDTO;
import com.itbank.image.ImageServiceImpl;
import com.itbank.web.FileUpload;

@Controller
@SessionAttributes("user")
@RequestMapping(value="/member")
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired MemberServiceImpl memberService;
	@Autowired ImageServiceImpl imageService;
	@Autowired MemberDTO member;
	@Autowired ImageDTO image;
	
	
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
	@RequestMapping(value="/join",method=RequestMethod.POST)
	public String join(@ModelAttribute MemberDTO member,
			Model model
			){
		logger.info("[컨트롤러 : 회원가입] 아이디={}", member.getUserid());
		int joinOk = memberService.insert(member);
		if(joinOk != 0){
			image.setUserid(member.getUserid());
			image.setImage("default.gif");
			imageService.insert(image);
		}
		return "public/home/main.tiles";
	}
	@RequestMapping(value="/update/form",method=RequestMethod.GET)
	public String updateForm(@ModelAttribute("user") MemberDTO user,
			Model model){
		logger.info("[컨트롤러 : 수정폼]");
		model.addAttribute("member",user);
		return "auth/member/update.tiles";
	}
	@RequestMapping(value="/update",method=RequestMethod.POST)
	public String update(
			@RequestParam(required=false, value="file") MultipartFile multipartFile,
			@RequestParam("password")String password,
			@RequestParam("email")String email,
			@ModelAttribute("user")MemberDTO user)throws Exception{
		logger.info("[컨트롤러 : 수정] 파일 = {}",multipartFile.toString());
		logger.info("[컨트롤러 : 수정] 비번 = {}",password);
		logger.info("[컨트롤러 : 수정] 이메일 = {}",email);
		/*file info*/
		String path = "C:\\Users\\Administrator\\git\\bankspring\\bankSpring\\src\\main\\webapp\\resources\\image\\member\\";
		String fileName = multipartFile.getOriginalFilename();
		FileUpload fileWriter = new FileUpload(); 
		String fullPath = fileWriter.uploadFile(multipartFile,path,fileName);
		logger.info("[컨트롤러 : 수정] 파일업로드 경로 : {}",fullPath);
		logger.info("[컨트롤러 : 수정] 파일이름  : {}",fileName);
		member.setEmail(email);
		member.setProfile(fileName);
		member.setPassword(password);
		int ok = memberService.update(member);
		
		return "redirect:/member/detail/"+member.getUserid();
	}
	@RequestMapping(value="/remove",method=RequestMethod.GET)
	public String delete(@ModelAttribute MemberDTO member){
		logger.info("[컨트롤러 : 삭제]");
		return "";
	}
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/
	@RequestMapping("/detail/{userid}")
	public @ResponseBody MemberDTO detail(@PathVariable("userid")String userid,
			Model model){
		logger.info("[컨트롤러 : 상세]");
		String searchKey = "userid",searchVal = userid;
		return memberService.detail(CommandFactory.detail(searchKey, searchVal));
	}
	@RequestMapping("/search")
	public @ResponseBody List<MemberDTO> search(@PathVariable("userid")String userid,
			Model model){
		logger.info("[컨트롤러 : 조회]");
		List<MemberDTO> list = new ArrayList<MemberDTO>();
		String searchKey = "userid",searchVal = userid;
		return memberService.search(CommandFactory.search(1,searchKey, searchVal)); 
		// 1 : 페이지넘버
	}

	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String login(@RequestParam("userid")String userid,
			@RequestParam("password")String password,
			Model model){
		logger.info("[컨트롤러 : 로그인] : id = {}, pass ={} ",userid, password);
		String searchKey = "userid", searchVal = userid;
		member = memberService.detail(CommandFactory.detail(searchKey,searchVal));
		if (member != null) {
			if (member.getPassword().equals(password)) {
				logger.info("====== 로그인 성공 ======  ");
				model.addAttribute("user", member);
				model.addAttribute("member", member);
				return "auth/member/content.tiles";
			} else {
				logger.info("====== 비밀번호가 틀렸습니다 ======  ");
				model.addAttribute("msg","비밀번호가 틀렸습니다.");
				return "auth/member/redirect.tiles";
			}
			
		}else{
			logger.info("====== 아이디가 존재하지 않습니다. ======  ");
			model.addAttribute("msg","아이디가 존재하지 않습니다. ");
			return "auth/member/redirect.tiles";
		}
		
		
	}

	//***********************************************/
	/*no execute*/
	//***********************************************/
	@RequestMapping("/path/{action}/{userid}")
	public String path(@PathVariable("action")String action,
			@PathVariable("userid")String userid,
			@ModelAttribute("user") MemberDTO user, Model model){
		logger.info("[ 컨트롤러 ] 경로 액션 = {}", action);
		model.addAttribute("member", user);
		model.addAttribute("action", action);
		return "auth/member/"+action+".tiles";
	}

	@RequestMapping("/logout")
	
	public String logout(@ModelAttribute("user") MemberDTO user,SessionStatus status){
		status.setComplete(); // 세션을 비우고 로그아웃 처리
		logger.info("[컨트롤러 : 로그아웃]");
		return "redirect:/home/main";
	}
	

	@RequestMapping(value="/adminForm")
	public String adminForm(){
		logger.info("MemberController : adminForm()");
		
		return "auth/member/adminForm.tiles";
	}
	
}
