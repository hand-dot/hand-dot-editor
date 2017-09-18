package com.handdot.handdoteditor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.handdot.handdoteditor.domain.Clip;

@Repository
public abstract interface ClipRepository extends JpaRepository<Clip, Integer> {
}
