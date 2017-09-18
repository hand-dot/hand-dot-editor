package com.handdot.handdoteditor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.handdot.handdoteditor.dto.ClipDto;
import com.handdot.handdoteditor.service.ClipService;

@Controller
public class WebSocketController {
	@Autowired
	ClipService clipService;

	@SendTo({ "/topic/whiteboad" })
	@MessageMapping({ "/whiteboad/get" })
	public List<ClipDto> getClips() throws InterruptedException {
		return this.clipService.getAllClips();
	}

	@MessageMapping({ "/whiteboad/create" })
	@SendTo({ "/topic/whiteboad" })
	public ClipDto createClip(ClipDto clip) throws InterruptedException {
		return this.clipService.registerClip(clip);
	}

	@MessageMapping({ "/whiteboad/update" })
	@SendTo({ "/topic/whiteboad" })
	public ClipDto updateClip(ClipDto clip) throws InterruptedException {
		return this.clipService.updateClip(clip);
	}

	@MessageMapping({ "/whiteboad/remove" })
	@SendTo({ "/topic/whiteboad" })
	public ClipDto removeClip(ClipDto clip) throws InterruptedException {
		return this.clipService.removeClip(clip);
	}
}
