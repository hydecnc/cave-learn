import styles from './style.module.css';

export default function Subheader(){
    return (
    <div className={styles['subheader--container']}>
        <div className={styles['subheader--text']}>
            <p className="text-eyebrow">Exercise   .   Test Yourself</p>
            <p className="text-h2">Drag every component into its layer.</p>
        </div>
        <div className={styles['subheader--score']}>
            <div className={styles['circle']}></div>
            <p>score&nbsp;&nbsp;-</p>
            <div className={styles['circle--small']}></div>
            <p>0&nbsp;&nbsp;/&nbsp;&nbsp;13&nbsp;&nbsp;correct</p>
        </div>
        <div className={styles['subheader--options']}>
            <button className="btn btn--secondary">Hint</button>
            <button className="btn btn--secondary">Reset</button>
            <button className="btn btn--secondary">Reveal</button>
            <button className={`btn btn--primary btn--check-work ${styles['btn--check-work']}`}>Check My Work</button>
        </div>
    </div>
)}
