interface featureCardProps {
    name: string;
    onClick?: () => void;
    image?: string;
}

export default function FeatureCard({name, onClick, image}: featureCardProps) {
    return (
        <div className="border border-neutral-700 bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer rounded p-2" onClick={onClick}>
            <img className="w-48 h-48 object-cover rounded" src={image} alt="image" />
            <p>{name}</p>
        </div>
    );
}