package com.handdot.handdoteditor.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handdot.handdoteditor.domain.Clip;
import com.handdot.handdoteditor.dto.ClipDto;
import com.handdot.handdoteditor.repository.ClipRepository;

@Service
public class ClipService {
	@Autowired
	ClipRepository clipRepository;

	public List<ClipDto> getAllClips() {
		List<Clip> allClip = this.clipRepository.findAll();
		List<ClipDto> dtos = new ArrayList();
		for (Clip clip : allClip) {
			ClipDto dto = new ClipDto();
			BeanUtils.copyProperties(clip, dto);
			dtos.add(dto);
		}
		return dtos;
	}

	public ClipDto registerClip(ClipDto clip) {
		Clip createdClip = new Clip();
		BeanUtils.copyProperties(clip, createdClip);
		this.clipRepository.save(createdClip);
		BeanUtils.copyProperties(createdClip, clip);
		clip.setMethodType("registerClip");

		return clip;
	}

	public ClipDto updateClip(ClipDto clip) {
		Clip findedClip = (Clip) this.clipRepository.findOne(clip.getId());
		BeanUtils.copyProperties(clip, findedClip);
		this.clipRepository.save(findedClip);
		BeanUtils.copyProperties(findedClip, clip);
		clip.setMethodType("updateClip");

		return clip;
	}

	public ClipDto removeClip(ClipDto clip) {
		Clip findedClip = (Clip) this.clipRepository.findOne(clip.getId());
		BeanUtils.copyProperties(clip, findedClip);
		this.clipRepository.delete(findedClip);
		BeanUtils.copyProperties(findedClip, clip);
		clip.setMethodType("removeClip");

		return clip;
	}
}