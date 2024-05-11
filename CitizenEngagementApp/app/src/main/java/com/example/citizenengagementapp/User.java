package com.example.citizenengagementapp;

public class User {
    private String username;
    private String email;
    private String address;
    private String wardNo;

    public User(String username, String email, String address, String wardNo) {
        this.username = username;
        this.email = email;
        this.address = address;
        this.wardNo = wardNo;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getWardNo() {
        return wardNo;
    }
}
