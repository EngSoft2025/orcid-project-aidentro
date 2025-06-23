import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFollowing, getResearchersByOrcidIds, getUserIdentity, unfollowResearcher } from "@/api/orcidApi";
import { FollowingResearcher } from "@/types";
import { getStoredOrcidId } from "@/utils/orcidAuth";
import { toast } from "sonner";

const Connections = () => {
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const [following, setFollowing] = useState<FollowingResearcher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      setLoading(true);
      try {
        const orcidIds = await getFollowing();
        setFollowingIds(orcidIds);
        if (!orcidIds.length) {
          setFollowing([]);
          setLoading(false);
          return;
        }
        // Busca em lote
        const researchers = await getResearchersByOrcidIds(orcidIds);
        // Para cada ID que não veio na resposta, cria um objeto mínimo
        const foundIds = new Set(researchers.map((r: any) => r.orcidId));
        const missingIds = orcidIds.filter(id => !foundIds.has(id));
        const missingObjs = missingIds.map(id => ({ orcidId: id }));
        setFollowing([...researchers, ...missingObjs]);
      } catch (err: any) {
        toast.error(err.message || "Failed to load following list");
        setFollowing([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, []);

  const handleUnfollow = async (orcidId: string) => {
    const myOrcidId = getStoredOrcidId();
    if (!myOrcidId) {
      toast.error("You must be logged in with ORCID to unfollow researchers.");
      return;
    }
    try {
      await unfollowResearcher(myOrcidId, orcidId);
      setFollowing((prev) => prev.filter((r) => r.orcidId !== orcidId));
      setFollowingIds((prev) => prev.filter((id) => id !== orcidId));
      toast.success("Unfollowed successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to unfollow researcher");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Connections</h1>
        {loading ? (
          <div>Loading...</div>
        ) : following.length === 0 ? (
          <div className="text-gray-500">You are not following any researchers yet.</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {following.map((r) => (
              <Card key={r.orcidId}>
                <CardHeader>
                  <CardTitle>{r.name || r.orcidId}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 mb-2">ORCID: {r.orcidId}</div>
                  {r.institutionName && (
                    <div className="text-sm text-gray-700">{r.institutionName}</div>
                  )}
                  {!r.name && (
                    <div className="text-xs text-gray-400 mb-2">No public data found for this ORCID ID.</div>
                  )}
                  <Button
                    variant="outline"
                    className="mt-4 text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => handleUnfollow(r.orcidId)}
                  >
                    Unfollow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Connections; 