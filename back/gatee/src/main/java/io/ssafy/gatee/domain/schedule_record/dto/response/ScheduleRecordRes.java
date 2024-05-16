package io.ssafy.gatee.domain.schedule_record.dto.response;

import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record ScheduleRecordRes(

        @NotNull
        Long scheduleRecordId,

        @NotNull
        String content,

        @NotNull
        List<FileUrlRes> fileUrlList
) {
    public static ScheduleRecordRes toDto(ScheduleRecord scheduleRecord, List<FileUrlRes> fileUrlResList) {
        return ScheduleRecordRes.builder()
                .scheduleRecordId(scheduleRecord.getId())
                .content(scheduleRecord.getContent())
                .fileUrlList(fileUrlResList)
                .build();
    }
}
