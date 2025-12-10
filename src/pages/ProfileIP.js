// src/pages/ProfileIP.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

const ProfileIP = () => {
  const [activeTab, setActiveTab] = useState("personal"); // "personal" | "work"

  return (
    <>
      {/* NAVBAR ATAS */}
      <Navbar />

      <div className="profile-wrapper">
        {/* Header My Profile */}
        <section className="profile-page-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and preferences</p>
        </section>

        {/* Kartu Profil Utama */}
        <section className="profile-card">
          <div className="profile-left">
            <div className="profile-avatar-large">
              {/* ganti dengan foto kamu sendiri kalau ada */}
              <img
                src={require("../images/landing-page.jpeg")}
                alt="Mina Muadi"
              />
            </div>
            <div className="profile-emp-badge">EMP-2024-0156</div>
          </div>

          <div className="profile-main">
            <div className="profile-headline">
              <h2 className="profile-name">Mina Muadi</h2>
              <p className="profile-position">Human Resource Staff</p>
            </div>

            <div className="profile-meta">
              <div className="profile-meta-item">
                <span className="profile-meta-icon">👥</span>
                <span>Human Resource</span>
              </div>
              <div className="profile-meta-item">
                <span className="profile-meta-icon">📍</span>
                <span>Surabaya</span>
              </div>
              <div className="profile-meta-item">
                <span className="profile-meta-icon">📅</span>
                <span>Joined 10/02/2023</span>
              </div>
            </div>

            <p className="profile-bio">
              Passionate human resource development with 5+ years of experience
              in building environment. Love collaborating with teams and
              mentoring junior HR staff.
            </p>
          </div>

          <div className="profile-actions">
            <button className="profile-btn-primary">Edit Profile</button>
          </div>
        </section>

        {/* Tabs */}
        <section className="profile-tabs">
          <button
            className={`profile-tab ${
              activeTab === "personal" ? "active" : ""
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Info
          </button>
          <button
            className={`profile-tab ${activeTab === "work" ? "active" : ""}`}
            onClick={() => setActiveTab("work")}
          >
            Work Details
          </button>
        </section>

        {/* CONTENT BERDASARKAN TAB */}
        {activeTab === "personal" && (
          <section className="profile-info-card">
            <h3 className="profile-info-title">Personal Information</h3>

            <div className="profile-info-grid">
              <div className="profile-info-item">
                <div className="profile-info-label">
                  <span className="profile-info-icon">✉️</span>
                  <span>Email Address</span>
                </div>
                <p className="profile-info-value">minamuadi@admin.com</p>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">
                  <span className="profile-info-icon">📞</span>
                  <span>Phone Number</span>
                </div>
                <p className="profile-info-value">081456789110</p>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">
                  <span className="profile-info-icon">🎂</span>
                  <span>Date of Birth</span>
                </div>
                <p className="profile-info-value">20/05/1990</p>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">
                  <span className="profile-info-icon">📍</span>
                  <span>Location</span>
                </div>
                <p className="profile-info-value">Surabaya</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "work" && (
          <section className="profile-info-card">
            <h3 className="profile-info-title">Work Details</h3>

            <div className="profile-info-grid">
              <div className="profile-info-item">
                <div className="profile-info-label">
                  <span>Job Title</span>
                </div>
                <p className="profile-info-value">Human Resource Staff</p>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">
                  <span>Department</span>
                </div>
                <p className="profile-info-value">Human Resource</p>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">
                  <span>Manager</span>
                </div>
                <p className="profile-info-value">Anna Horan</p>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">
                  <span>Date Joined</span>
                </div>
                <p className="profile-info-value">10/02/2024</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ProfileIP;
