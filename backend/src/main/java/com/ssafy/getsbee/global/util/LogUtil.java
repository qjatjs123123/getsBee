package com.ssafy.getsbee.global.util;

import com.ssafy.getsbee.global.common.model.Interaction;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@Slf4j
public class LogUtil {

    public static void loggingInteraction(Interaction interaction, Long postId) {
        log.info("memberId:{}, postId:{}, eventType:{}, eventValue:{} timestamp:{}",
                SecurityUtil.getCurrentMemberId(), postId, interaction.getEventType(), interaction.getEventValue(),
                (new Date()).getTime());
    }
}
