package com.neighbor.mapper;

import com.neighbor.domain.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class ReplyMapperTests {

    @Autowired
    ReplyMapper replyMapper;

    /* 후기관리 후기글 전체 조회 */
    @Test
    public void selectAllTest() {
        log.info(replyMapper.selectAll().toString());
    }

    /* 후기관리 후기글 삭제 테스트 */
    @Test
    public void deleteTest() {
        MemberVO memberVO = new MemberVO();
        memberVO.setMemberId(4L);
        replyMapper.delete(memberVO.getMemberId());
    }

}
