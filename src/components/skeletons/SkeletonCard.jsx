const SkeletonCard = ({ type = 'default' }) => {
    if (type === 'stat') {
        return (
            <div className="stat-item skeleton-loading">
                <div className="skeleton skeleton-icon"></div>
                <div>
                    <div className="skeleton skeleton-text" style={{ width: '60px', height: '28px' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '80px', height: '16px', marginTop: '8px' }}></div>
                </div>
            </div>
        );
    }

    if (type === 'project') {
        return (
            <div className="project-card skeleton-loading">
                <div className="project-header">
                    <div className="skeleton skeleton-icon"></div>
                </div>
                <div className="skeleton skeleton-text" style={{ width: '70%', height: '24px', marginBottom: '12px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '100%', height: '16px', marginBottom: '8px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '90%', height: '16px' }}></div>
                <div className="project-footer" style={{ marginTop: '16px' }}>
                    <div className="skeleton skeleton-text" style={{ width: '80px', height: '24px' }}></div>
                </div>
            </div>
        );
    }

    if (type === 'info-card') {
        return (
            <div className="info-card skeleton-loading">
                <div className="skeleton skeleton-icon"></div>
                <div className="skeleton skeleton-text" style={{ width: '60%', height: '20px', marginBottom: '8px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '80%', height: '16px' }}></div>
            </div>
        );
    }

    return (
        <div className="skeleton-loading">
            <div className="skeleton skeleton-text"></div>
        </div>
    );
};

export default SkeletonCard;
