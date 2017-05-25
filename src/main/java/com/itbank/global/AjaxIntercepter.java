package com.itbank.global;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AjaxIntercepter extends HandlerInterceptorAdapter{
@Override
public void postHandle(HttpServletRequest request,
		HttpServletResponse response, Object handler,
		ModelAndView modelAndView) throws Exception {
	// TODO Auto-generated method stub
	super.postHandle(request, response, handler, modelAndView);
	response.setHeader("Access-Control-Allow-Origin", "*");
}
}
