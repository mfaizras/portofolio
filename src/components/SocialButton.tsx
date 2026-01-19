export default function SocialButton({icon,link}: {icon: string, link: string}) {
    return (
        <a href={link} target="_blank" className="rounded-full bg-primary p-3 m-2 button hover:p-4 transition-all duration-300">
            <i className={icon}></i>
        </a>
    );
}