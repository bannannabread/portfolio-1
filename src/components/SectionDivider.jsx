import React from 'react';
import './SectionDivider.css';

const SectionDivider = ({ label = "SECTION" }) => {
    return (
        <div className="section-divider">
            <span className="divider-label">{label}</span>
            <div className="divider-line" />
            <span className="divider-label">↓</span>
        </div>
    );
};

export default SectionDivider;
