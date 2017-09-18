package com.handdot.handdoteditor.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({ "/" })
public class MainController {
	@RequestMapping(method = { RequestMethod.GET })
	String index(Model model) throws UnknownHostException {
		String addres = InetAddress.getLocalHost().getHostAddress();
		model.addAttribute("ip", addres);
		return "index";
	}
}
