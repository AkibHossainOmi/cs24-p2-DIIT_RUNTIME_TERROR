package com.example.citizenengagementapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.PopupMenu;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class ForumActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.forum_page);

        // Initialize the three-dot button
        ImageButton btnThreeDot = findViewById(R.id.btnThreeDot);
        btnThreeDot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create and show the PopupMenu
                showPopupMenu(btnThreeDot);
            }
        });

        // Initialize the ListView for forum posts
        ListView listForumPosts = findViewById(R.id.listForumPosts);

        // Sample list of forum posts (replace with your own data)
        ArrayList<String> forumPosts = new ArrayList<>();
        forumPosts.add("Post 1: How can we improve waste management in our community?");
        forumPosts.add("Post 2: Share your success stories in waste management.");
        forumPosts.add("Post 3: Discuss recycling strategies.");

        // Create an adapter and set it to the ListView
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, forumPosts);
        listForumPosts.setAdapter(adapter);

        findViewById(R.id.btnNewPost);
        Button btnNewPost = findViewById(R.id.btnNewPost);
        btnNewPost.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ForumActivity.this, CreatePostActivity.class);
                startActivity(intent);
            }
        });
    }

    // Method to show the PopupMenu
    private void showPopupMenu(View view) {
        PopupMenu popupMenu = new PopupMenu(this, view);
        popupMenu.getMenuInflater().inflate(R.menu.popup_menu, popupMenu.getMenu());
        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                if (item.getItemId() == R.id.menu_logout) {
                    logoutUser();
                    return true;
                }
                if (item.getItemId() == R.id.menu_issue_reporting) {
                    Intent intent = new Intent(ForumActivity.this, ReportIssueActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_user_profile) {
                    Intent intent = new Intent(ForumActivity.this, UserProfileActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_notification) {
                    Intent intent = new Intent(ForumActivity.this, NotificationActivity.class);
                    startActivity(intent);
                    return true;
                }
                return false;
            }
        });
        popupMenu.show();
    }

    // Method to log out the user
    private void logoutUser() {
        // Perform any necessary tasks for logging out the user
        // For example, clear session data, reset user preferences, etc.

        // Navigate to SignInActivity
        Intent intent = new Intent(ForumActivity.this, SignInActivity.class);
        // Clear the activity stack to prevent the user from navigating back to the profile page
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        // Finish the current activity
        finish();
    }
}
