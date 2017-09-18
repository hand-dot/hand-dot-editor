package com.handdot.handdoteditor.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({ "/" })
public class MainController {

	private String text = "console.log('Let`s Shere URL!!');";

	@RequestMapping(method = { RequestMethod.GET })
	String index(Model model) throws UnknownHostException {
		String addres = InetAddress.getLocalHost().getHostAddress();
		model.addAttribute("ip", addres);
		return "index";
	}

	@SendTo({ "/topic/ws" })
	@MessageMapping({ "/ws/get" })
	public String getText() throws InterruptedException {
		return this.text;
	}

	@SendTo({ "/topic/ws" })
	@MessageMapping({ "/ws/set" })
	public String setText(String text) throws InterruptedException {
		this.text = text;
		return this.text;
	}
}
