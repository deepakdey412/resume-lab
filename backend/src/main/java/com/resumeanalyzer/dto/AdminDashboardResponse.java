package com.resumeanalyzer.dto;

import java.util.List;

public class AdminDashboardResponse {
    private int totalUsers;
    private List<UserInfo> users;

    public AdminDashboardResponse() {}

    public AdminDashboardResponse(int totalUsers, List<UserInfo> users) {
        this.totalUsers = totalUsers;
        this.users = users;
    }

    public int getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(int totalUsers) {
        this.totalUsers = totalUsers;
    }

    public List<UserInfo> getUsers() {
        return users;
    }

    public void setUsers(List<UserInfo> users) {
        this.users = users;
    }

    public static class UserInfo {
        private Long userId;
        private String email;
        private String fullName;
        private int resumeCount;

        public UserInfo() {}

        public UserInfo(Long userId, String email, String fullName, int resumeCount) {
            this.userId = userId;
            this.email = email;
            this.fullName = fullName;
            this.resumeCount = resumeCount;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public int getResumeCount() {
            return resumeCount;
        }

        public void setResumeCount(int resumeCount) {
            this.resumeCount = resumeCount;
        }
    }
}
