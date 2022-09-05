import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/Profile.module.css";
import { CONTRACT_ADDRESS } from "../utils/contractAddress";
const NftItem_ = dynamic(
  () => import("../components/ProfileNftItem/ProfileNftItem")
);
const _TransferNftModal = dynamic(
  () => import("../components/TransferNftModal/TransferNftModal"),
  { ssr: false }
);
const ProfilePage = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const {
    data: ownedNFTs,
    isLoading,
    error,
  } = useOwnedNFTs(contract?.nft, address);
  if (!address)
    return (
      <Container>
        <p
          style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}
        >
          Connect your wallet to see stuff
        </p>
      </Container>
    );
  if (isLoading)
    return (
      <Container>
        <p
          style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}
        >
          Loading stuff. Don&apos;t get impatient
        </p>
      </Container>
    );
  if (!ownedNFTs || !ownedNFTs.length)
    return (
      <Container>
        <p
          style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}
        >
          You don&apos;t own any NFTs and you will never be happy
        </p>
      </Container>
    );
  return (
    <Container>
      <_TransferNftModal />
      <div className={styles.NftContainer}>
        {!isLoading ? (
          <>
            {ownedNFTs?.map((nft) => (
              <NftItem_ nft={nft} key={nft.metadata.id.toString()} />
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  );
};

export default ProfilePage;
