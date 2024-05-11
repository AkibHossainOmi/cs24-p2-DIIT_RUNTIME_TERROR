package com.example.citizenengagementapp;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseHelperClass extends SQLiteOpenHelper {
    // Database constants
    private static final String DATABASE_NAME = "citizen_engagement.db";
    private static final int DATABASE_VERSION = 1;

    // Table constants
    private static final String TABLE_NAME = "users";
    private static final String COLUMN_ID = "id";
    private static final String COLUMN_USERNAME = "username";
    private static final String COLUMN_PASSWORD = "password";
    private static final String COLUMN_EMAIL = "email";
    private static final String COLUMN_ADDRESS = "address";
    private static final String COLUMN_WARD_NO = "wardNo";

    public DatabaseHelperClass(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // Create the users table
        String CREATE_USERS_TABLE = "CREATE TABLE " + TABLE_NAME + "("
                + COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                + COLUMN_USERNAME + " TEXT,"
                + COLUMN_PASSWORD + " TEXT,"
                + COLUMN_EMAIL + " TEXT,"
                + COLUMN_ADDRESS + " TEXT,"
                + COLUMN_WARD_NO + " TEXT" + ")";
        db.execSQL(CREATE_USERS_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Drop older table if existed
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);

        // Create tables again
        onCreate(db);
    }

    public long insertData(String username, String password, String email, String address, String wardNo) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COLUMN_USERNAME, username);
        values.put(COLUMN_PASSWORD, password);
        values.put(COLUMN_EMAIL, email);
        values.put(COLUMN_ADDRESS, address);
        values.put(COLUMN_WARD_NO, wardNo);
        long result = db.insert(TABLE_NAME, null, values);
        db.close();
        return result;
    }

    public User getUser(String usernameEmail, String password) {
        SQLiteDatabase db = this.getReadableDatabase();
        User user = null;

        // Define the columns to be retrieved
        String[] columns = {
                COLUMN_USERNAME,
                COLUMN_EMAIL,
                COLUMN_ADDRESS,
                COLUMN_WARD_NO
        };

        // Define the selection criteria
        String selection = "(" + COLUMN_USERNAME + " = ? OR " + COLUMN_EMAIL + " = ?) AND " + COLUMN_PASSWORD + " = ?";

        // Define the selection arguments
        String[] selectionArgs = {usernameEmail, usernameEmail, password};

        // Query the database
        Cursor cursor = db.query(
                TABLE_NAME,
                columns,
                selection,
                selectionArgs,
                null,
                null,
                null
        );

        // Check if the cursor contains any data
        if (cursor != null && cursor.moveToFirst()) {
            // Extract user information from the cursor
            int usernameIndex = cursor.getColumnIndex(COLUMN_USERNAME);
            int emailIndex = cursor.getColumnIndex(COLUMN_EMAIL);
            int addressIndex = cursor.getColumnIndex(COLUMN_ADDRESS);
            int wardNoIndex = cursor.getColumnIndex(COLUMN_WARD_NO);

            if (usernameIndex != -1 && emailIndex != -1 && addressIndex != -1 && wardNoIndex != -1) {
                String username = cursor.getString(usernameIndex);
                String email = cursor.getString(emailIndex);
                String address = cursor.getString(addressIndex);
                String wardNo = cursor.getString(wardNoIndex);

                // Create a new User object
                user = new User(username, email, address, wardNo);
            }
        }

        // Close the cursor and database
        if (cursor != null) {
            cursor.close();
        }
        db.close();

        // Return the user object
        return user;
    }
}
