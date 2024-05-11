package com.example.citizenengagementapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.PopupMenu;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class CreatePostActivity extends AppCompatActivity {

    private EditText editTextPostTitle;
    private EditText editTextPostContent;
    private Button btnSubmitPost;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.create_post_layout);

        // Initialize views
        editTextPostTitle = findViewById(R.id.editTextPostTitle);
        editTextPostContent = findViewById(R.id.editTextPostContent);
        btnSubmitPost = findViewById(R.id.btnSubmitPost);

        // Set OnClickListener for the Submit Post button
        btnSubmitPost.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Get post title and content
                String postTitle = editTextPostTitle.getText().toString().trim();
                String postContent = editTextPostContent.getText().toString().trim();

                // Check if title and content are not empty
                if (!postTitle.isEmpty() && !postContent.isEmpty()) {
                    // Post is valid, proceed (You can implement your logic here)
                    // For now, just show a toast message
                    String message = "Post Title: " + postTitle + "\nPost Content: " + postContent;
                    Toast.makeText(CreatePostActivity.this, message, Toast.LENGTH_LONG).show();

                    // Clear input fields
                    editTextPostTitle.setText("");
                    editTextPostContent.setText("");
                    Intent intent = new Intent(CreatePostActivity.this, ForumActivity.class);
                    startActivity(intent);
                } else {
                    // Show error message if title or content is empty
                    Toast.makeText(CreatePostActivity.this, "Please enter title and content", Toast.LENGTH_SHORT).show();
                }
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
                    Intent intent = new Intent( CreatePostActivity.this, ReportIssueActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_user_profile) {
                    Intent intent = new Intent(CreatePostActivity.this, UserProfileActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_notification) {
                    Intent intent = new Intent(CreatePostActivity.this, NotificationActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_comunity_engagement) {
                    Intent intent = new Intent(CreatePostActivity.this, ForumActivity.class);
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
        Intent intent = new Intent(CreatePostActivity.this, SignInActivity.class);
        // Clear the activity stack to prevent the user from navigating back to the profile page
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        // Finish the current activity
        finish();
    }
}
