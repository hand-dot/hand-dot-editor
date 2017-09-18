package com.handdot.handdoteditor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ToStringBuilder;

@Entity
@Table(name = "clips")
public class Clip {
	@Id
	@GeneratedValue
	private Integer id;
	@Column(nullable = false)
	private String owner;
	@Column(nullable = false)
	private String content;
	@Column(nullable = false)
	private Integer left;
	@Column(nullable = false)
	private Integer top;
	@Column(nullable = false)
	private Integer width;
	@Column(nullable = false)
	private Integer height;
	@Column(nullable = false)
	private String color;

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getOwner() {
		return this.owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getLeft() {
		return this.left;
	}

	public void setLeft(Integer left) {
		this.left = left;
	}

	public Integer getTop() {
		return this.top;
	}

	public void setTop(Integer top) {
		this.top = top;
	}

	public Integer getWidth() {
		return this.width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public Integer getHeight() {
		return this.height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public String getColor() {
		return this.color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}