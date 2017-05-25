package com.itbank.web;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

public class FileController  extends MultiActionController{
private File uploadDir;
	
	public void setUploadDir(File uploadDir) {
		this.uploadDir = uploadDir;
	}
	@Override
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		String resultMessage = "";
		response.setContentType("text/plain");
		if(!(request instanceof MultipartHttpServletRequest)){
			response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Expected multipart request");
			return null;
		}
		
		MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) request;
		MultipartFile imgFile = multiReq.getFile("file");
		final String imgFileName = imgFile.getOriginalFilename().trim();
		String filePath = uploadDir.getAbsolutePath() + File.separator;
		
		
		//용량체크
		long fileSize = imgFile.getSize();
		if(fileSize>2048000 || fileSize <= 0){resultMessage = "20MB 이상의 파일은 업로드 할 수 업습니다.";}
		//확장자체크
		int pathPoint = imgFileName.lastIndexOf(".");
		String  filePoint = imgFileName.substring(pathPoint+1, imgFileName.length());
		String fileType =filePoint.toLowerCase();
		
		if(fileType.equalsIgnoreCase("jpg")&& !fileType.equals("bmp")
				&& !fileType.equalsIgnoreCase("gif")){resultMessage = "이미지 파일만 업로드 가능합니다.";}
		// 파일을 지정한 위치에 upload
		File file = new File(filePath + "64");
		if(!file.exists()){
			file.mkdirs(); // 디렉토리 생성
		}
		
		String finalFnm = filePath + "64" +File.separator + imgFileName;
		System.out.println("finalFnm:"+finalFnm);
		imgFile.transferTo(new File(finalFnm));
		resultMessage = "정상적으로 업로드 하였습니다";
		resultMessage = "\n저장된 파일=>"+finalFnm;
		
		
		ModelAndView mav = new ModelAndView("redirect:mobile/regist");
		mav.addObject("resultMessage", resultMessage);
		mav.setViewName("mobile/regist");
		return mav;
		
		
		
	}
}
